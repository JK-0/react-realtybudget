// src/services/api.js
const BASE = import.meta.env.VITE_API_BASE;

export const sendOtp = async (email, csrfToken) => {
  return fetch(`${BASE}/auth/api/login/email/otp/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
      accept: "application/json",
    },
    body: JSON.stringify({ email }),
  });
};

export const validateOtp = async (email, otp, csrfToken) => {
  return fetch(`${BASE}/auth/api/login/email/otp/validate/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
      accept: "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });
};

export const getUser = async (accessToken, csrfToken) => {
  return fetch(`${BASE}/auth/api/me/`, {
    method: "GET",
    headers: {
      "CAuthorization": `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken,
      accept: "application/json",
    },
  });
};

export const getProjxList = async (accessToken, csrfToken) => {
  return fetch(`${BASE}/project/api/list/`, {
    method: "GET",
    headers: {
      "CAuthorization": `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken,
      accept: "application/json",
    },
  });
};

export const getProjectById = async (id, accessToken, csrfToken) => {
  return fetch(`${BASE}/project/api/get/${id}/`, {
    method: "GET",
    headers: {
      "CAuthorization": `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken,
      accept: "application/json",
    },
  });
};

export const updateProject = async (id, formData, accessToken, csrfToken) => {
  return fetch(`${BASE}/project/api/update/${id}/`, {
    method: "PUT",
    headers: {
      "CAuthorization": `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken,
      accept: "application/json",
    },
    body: formData, // Must be FormData, not JSON
  });
};

export const createProject = async (formData, accessToken, csrfToken) => {
  const BASE = import.meta.env.VITE_API_BASE;
  return fetch(`${BASE}/project/api/create/`, {
    method: "POST",
    headers: {
      "CAuthorization": `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken,
      accept: "application/json",
    },
    body: formData,
  });
};

export const deleteProject = async (id, accessToken, csrfToken) => {
  return fetch(`${BASE}/project/api/delete/${id}/`, {
    method: "DELETE",
    headers: {
      "CAuthorization": `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken,
      accept: "application/json",
    },
  });
};

export const getTransactionsByProject = async (projectId, accessToken, csrfToken) => {
  return fetch(`${BASE}/transaction/api/list/?project=${projectId}`, {
    method: "GET",
    headers: {
      "CAuthorization": `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken,
      accept: "application/json",
    },
  });
};

export const createTransaction = async (formDataObj, accessToken, csrfToken) => {
  const formBody = new URLSearchParams(formDataObj).toString();

  return fetch(`${BASE}/transaction/api/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "CAuthorization": `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken,
      accept: "application/json",
    },
    body: formBody,
  });
};

export const createTag = async (formData, csrfToken, accessToken) => {
  try {
    const response = await fetch(`${BASE}/tag/api/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": csrfToken,
        "CAuthorization": `Bearer ${accessToken}`,  // Include Bearer token
        accept: "application/json",
      },
      body: formData.toString(),  // Send the formData
    });

    return response;
  } catch (error) {
    console.error("Error creating tag:", error);
    throw error;
  }
};

// Get list of tags for a project
export const getTagsByProject = async (projectId, csrfToken, accessToken) => {
  return fetch(`${BASE}/tag/api/list/?project=${projectId}`, {
    method: "GET",
    headers: {
      "X-CSRFToken": csrfToken,
      "CAuthorization": `Bearer ${accessToken}`,
      accept: "application/json",
    },
  });
};

export const getContributorsByProject = async (projectId, accessToken, csrfToken) => {
  return fetch(`${BASE}/contributor/api/list/?project=${projectId}`, {
    method: "GET",
    headers: {
      "CAuthorization": `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken,
      accept: "application/json",
    },
  });
};

export const createContributor = async (formData, accessToken, csrfToken) => {
  return fetch(`${BASE}/contributor/api/create/`, {
    method: "POST",
    headers: {
      "CAuthorization": `Bearer ${accessToken}`,
      "X-CSRFToken": csrfToken,
      accept: "application/json",
    },
    body: formData, // formData should include all fields and file as FormData
  });
};
