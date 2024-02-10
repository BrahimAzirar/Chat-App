const Login = async (data, apiUrl) => {
  try {
    const Req_Data = {
      method: "POST", body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    };
    const result = await (await fetch(`${apiUrl}/authMember/login`, Req_Data)).json();
    if (result.err) throw new Error(result.err);
    return result.response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const SignUp = async (data, apiUrl) => {
  try {
    const Req_Data = {
      method: "POST", body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    };
    const result = await (await fetch(`${apiUrl}/authMember/signUp`, Req_Data)).json();
    if (result.err) throw new Error(result.err);
    return result.response;
  } catch (error) {
    throw new Error(error.message);
  }
}

const EmailIsValid = async (data, apiUrl) => {
  try {
    const result = await (await fetch(`${apiUrl}/authMember/verifyEmail/${data.Email}`)).json();
    if (result.err) throw new Error(result.err);
    return result.response;
  } catch (error) {
    throw new Error(error.message);
  }
}

self.onmessage = async (e) => {
  const { message, data, API_URL } = e.data;

  try {
    if (message === "LoginToAccount") {
      const result = await Login(data, API_URL);
      self.postMessage(result);
    }
    else if (message === "CreateAccount") {
      const result = await SignUp(data, API_URL);
      self.postMessage(result);
    }
    else if (message === "VerifyEmail") {
      const result = await EmailIsValid(data, API_URL);
      self.postMessage({ result });
    }
  } catch (error) {
    self.postMessage({ err: error.message });
  }
};
