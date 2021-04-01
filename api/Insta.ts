import apiClient from "./Client";

const GetMediaData = (uri: any) =>
  apiClient.post(
    uri,
    {},
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0",
      },
    }
  );

export default { GetMediaData };

// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36
