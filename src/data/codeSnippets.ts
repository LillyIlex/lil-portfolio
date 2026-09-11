import type { Snippet } from "./types";

export const snippets: Snippet[] = [
  {
    id: "dra-form-validation",
    title: "Conditional Yup Schema for a Field Safety Form",
    language: "React (JavaScript)",
    description:
      "Validation for a dynamic risk-assessment form filled out on-site by field electricians, often on patchy mobile signal. Conditional (`when`) rules mean fields like permit numbers or hazard descriptions are only required when a sibling field flags them as relevant, avoiding a separate schema per branch of the form. The async validate call is wrapped to normalise Yup's exception-based error model into a consistent, predictable { isValid, errors } contract that the rest of the form doesn't need to know is backed by Yup at all.",
    code: `const passwordSchema = string()
  .matches(/\\d+/, 'Password must include at least 1 number')
  .matches(/[a-z]+/, 'Password must include at least one lowercase letter')
  .min(8, 'Password must be at least 8 characters long')
  .required('Password is a required field');

export const schemas = {
  [FORM_SUBMISSION_TYPES.DRA]: object().shape({
    OPERATOR_SITE_ID: string().required('Please enter a site ID'),
    HAZARDS: array().of(string()).min(1, 'Please select at least one option'),

    // Free-text description only required when "Other" is among the selections.
    HAZARDS_OTHER: string().when('HAZARDS', {
      is: (hazards) => hazards && hazards.includes('Other'),
      then: (schema) => schema.required('Please enter a description'),
      otherwise: (schema) => schema.notRequired(),
    }),

    // Permit numbers only required when a permit was flagged as needed.
    PERMIT_NUMBERS: array()
      .of(object({ value: string().required('Please enter a permit number') }))
      .when('PERMIT_REQUIRED', {
        is: 'Yes',
        then: (schema) => schema.min(1, 'Please enter at least one permit number'),
        otherwise: (schema) => schema.notRequired(),
      }),

    SIGNATURE: string().required('Signature is required'),
  }),
};

/** Runs a Yup schema and reshapes the result into { isValid, errors },
 *  ready to hand straight to form state. */
export const validateForm = async (schema, values) => {
  try {
    await schema.validate(values, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    const errors = {};
    if (error.inner) {
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
    }
    return { isValid: false, errors };
  }
};`,
  },
  {
    id: "dra-form-submit",
    title: "Status-Conditional Submit: Draft vs Full Validation",
    language: "React Native",
    description:
      "A single submit handler serving two distinct UX paths from the same form: full schema validation on final submit, but a lenient, validation-free path for saving a draft mid-shift when a field worker's signal drops out before they've finished. Expensive image-to-base64 conversion is deferred until after validation passes, so payloads that fail validation never pay that cost. try/finally guarantees the loading state resets even if the network call fails, so the UI can't get stuck mid-submit.",
    code: `const handleSubmit = async (status) => {
  if (status === FORM_SUBMISSION_STATUSES.SUBMITTED) {
    const { isValid, errors } = await validateForm(schemas[FORM_SUBMISSION_TYPES.DRA], formValues);
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
  }

  try {
    setLoading(true);
    const imageFieldIds = [DRA_FIELD_IDS.UPLOADED_IMAGES, DRA_FIELD_IDS.UPLOADED_SCREENSHOTS];
    const convertedValues = await convertFormImageFieldsToBase64(formValues, imageFieldIds);

    if (status === FORM_SUBMISSION_STATUSES.DRAFT) {
      // Drafts save locally for offline support rather than round-tripping the API.
      await setFormSubmission(FORM_SUBMISSION_TYPES.DRA, FORM_SUBMISSION_STATUSES.DRAFT, convertedValues, jobId, jobFormUuid);
      navigate(JOBS_ROUTE.JOB_DETAILS, { jobId });
      return;
    }

    const response = await submitJobForm(jobId, FORM_SUBMISSION_TYPES.DRA, jobFormUuid, {
      form_data: convertedValues,
    });

    const returnedUuid = response?.data?.job_form_uuid || jobFormUuid;
    setJobFormUuid(returnedUuid);

    // Clear the local draft once the real submit succeeds.
    await setFormSubmission(FORM_SUBMISSION_TYPES.DRA, FORM_SUBMISSION_STATUSES.SUBMITTED, convertedValues, jobId, returnedUuid);
    await clearSignature();
    setIsSuccess(true);
  } catch (e) {
    setFormErrors({ submit: 'Failed to submit form. Please try again.' });
  } finally {
    setLoading(false);
  }
};`,
  },
  {
    id: "questionnaire-conditionals",
    title: "Conditional Sub-Questions in a Multi-Step Questionnaire",
    language: "React (JavaScript)",
    description:
      "Drives a patient intake questionnaire where several steps have a conditional sub-question — asked only if the main question's answer warrants it, and only requiring a free-text description once that sub-question is answered a particular way. The same handler also decides, per step, whether to auto-advance once an answer is complete, so single-choice steps feel instant while steps needing a written description wait for the user. Each question type's rule is scoped by its own field id, so adding a new conditional step doesn't risk touching another one's logic.",
    code: `const handleAnswerUpdate = useCallback((questionnaireId, answer, multiple) => {
  setAllAnswers((prev) => ({ ...prev, [questionnaireId]: answer }));
  if (isNavigatingRef.current === 'BACK') return;

  let hideButton = false;
  let autoContinue = false;

  // Has a sub-question: only required once a treatment is selected, and only
  // needs a description once the sub-question is answered "yes".
  if (questionnaireId === 'treatments_used') {
    const mainArr = Array.isArray(answer?.mainQuestion) ? answer.mainQuestion : [];
    const selectedNone = mainArr.includes('None of these');
    const hasTreatment = mainArr.length > 0 && !selectedNone;
    const sub = answer?.subQuestion;
    const desc = (answer?.description || '').trim();

    if (selectedNone) {
      hideButton = true;
      autoContinue = true; // skip the sub-question entirely
    } else if (!hasTreatment) {
      hideButton = true;
    } else if (!sub) {
      hideButton = true;
    } else if (sub === 'yes') {
      hideButton = !desc; // needs a description before continuing
    } else if (sub === 'no') {
      hideButton = true;
      autoContinue = true;
    }
  }

  // Same yes/needs-description/no pattern reused across four unrelated
  // medical-history questions, each scoped by its own field id.
  if (['mental_health', 'medical_conditions', 'allergies', 'current_medication'].includes(questionnaireId)) {
    const main = answer?.mainQuestion;
    const desc = answer?.description?.trim();
    if (main === 'yes') {
      hideButton = !desc;
    } else if (main === 'no') {
      hideButton = true;
      autoContinue = true;
    } else {
      hideButton = true;
    }
  }

  // Single-choice steps auto-continue once answered, so they don't sit
  // waiting on a "Continue" tap.
  const ALWAYS_AUTO_CONTINUE = [1, 3, 9, 10];
  if (!multiple && ALWAYS_AUTO_CONTINUE.includes(currentStep) && !hideButton) {
    autoContinue = true;
  }

  setShowButton(!hideButton);
  if (autoContinue && !autoContinueTriggeredRef.current) {
    autoContinueTriggeredRef.current = true;
    setTimeout(() => handleContinue(), 800);
  }
}, [currentStep, handleContinue]);`,
  },
  {
    id: "edgex-push-notifications",
    title: "Push Token Lifecycle & Third-Party Segment Sync",
    language: "React Native",
    description:
      "Two pieces of push-notification housekeeping that call out to the API in different ways for good reason. Deleting the device's push token on logout deliberately bypasses the app's normal axios instance — that instance carries the 401-refresh interceptor, and calling it during logout caused an infinite loop, so this drops down to a bare axios call with the token attached manually instead. Segment sync reconciles a user's saved notification settings against a third-party push provider by diffing each channel against its own segment membership, batching every add/remove into a single Promise.all rather than firing them off one request at a time.",
    code: `export const getAndDeletePushNotificationToken = async () => {
  try {
    if (Device.isDevice) {
      const pushToken = await getPushNotificationsToken();
      const accessToken = await getAccessToken();

      if (accessToken && axiosInstance.defaults.headers['Authorization']) {
        // Using axiosInstance here (which carries the 401 refresh interceptor)
        // caused an infinite loop during logout, so this calls bare axios instead.
        await axios.delete(\`\${API_URL}device-token/\${pushToken?.data || ''}\`, {
          headers: { Authorization: \`Bearer \${accessToken}\` },
        });
      }
    }
  } catch (e) {
    console.log('getAndDeletePushNotificationToken failed', e);
  }
};

// Syncs PushEngage segment membership to match the user's saved notification settings.
// Each channel segment is added when both global push and the channel are enabled, removed otherwise.
export const syncPushEngageSegments = async (notificationSettings) => {
  if (!Device.isDevice) return;
  const pushEnabled = notificationSettings?.push_enabled ?? false;

  await Promise.all(
    Object.entries(PUSHENGAGE_SEGMENT_NAMES).map(([id, segmentName]) => {
      const channelEnabled = notificationSettings?.[id] ?? false;
      if (pushEnabled && channelEnabled) {
        return PushEngage.addSegment([segmentName]);
      } else {
        return PushEngage.removeSegment([segmentName]);
      }
    })
  );
};`,
  },
];