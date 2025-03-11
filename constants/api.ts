export const apiEndpoints = {
  auth: {
    signInWithGoogle: "/auth/signIn",
    accessToken: "/auth/accessToken",
  },
  user: {
    getUser: "/users",
    save: "/users/save",
    causeList: "/users/cause-request/list",
    donationList: "/users/donation/list",
    submit: "/users/donation/submit",
    transactions: "/users/:causeId/transactions",
    manageCampaign: "/users/:causeId/manageCampaign",
    updatePaymentStatus: "/users/:causeId/updatePaymentStatus",
  },
  causes: {
    getCauses: "/causes",
    getCauseById: "/public/causes",
    createCause: "/causes",
    getCategories: "/public/categories",
    causeSearch: "/public/causes/search",
    mostDonated: "/public/causes/most-donated",
  },
  volunteers: {
    request: "/public/volunteer/create",
  },
  base: {
    blob: "/blob-upload",
  },
};

export const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  SERVER_ERROR: 500,
  CREATED: 201,
  UNAUTHORIZED: 401,
} as const;
