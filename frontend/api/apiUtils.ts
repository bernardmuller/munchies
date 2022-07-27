export async function resolveResponse(res: any) {
  if (!res) {
    return {
      ok: false,
      message: 'Invalid response',
      data: null,
    };
  }

  const ok: boolean = res.status >= 200 && res.status < 300;

  const response = await res.json();
  return {
    ok,
    message: response.message && response.message,
    data: response,
  };
}

export function resolveRejected(res: any) {
  let err;

  if (res.response && res.response.data && res.response.data.message) {
    err = res.response.data.message;
  }

  return {
    ok: false,
    message: err || 'Unfortunately a technical error occurred',
    data: res.response && res.response.data,
  };
}
