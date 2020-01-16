import axios from "axios";

export default class ServerProxy {
  constructor() {
  }
  fetchData(iParam) {
    const fetchParam = {
      method: iParam.method ? iParam.method : "GET",
      url: iParam.url,
      mode: "cors",
      headers: iParam.headers,
    };
    if (iParam.data) fetchParam.data = iParam.data;
    return new Promise(resolve => {
      axios(fetchParam)
        .then(data => resolve(data))
        .catch(err =>
          resolve({
            error: err,
          })
        );
    });
  }
}
