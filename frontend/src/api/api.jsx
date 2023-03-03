const BASR_URL = "http://localhost:9100/api/";

const fetchData = (path = "") => {
  return fetch(`${BASR_URL}${path}`);
};

export const getMusicList = () => {
  return fetchData("scans-folder").then((res) => {
    console.log("res", res);
    return res.json();
  });
};

export const getMusic = (name) => {
  return `${BASR_URL}music/${encodeURIComponent(name)}`;
};

export const deleteMusic = (name) => {
  return fetchData(`delete/${name}`).then((res) => {
    console.log("res", res);
    return res.json();
  });
};

export const safeFilename = () => {
  return fetchData(`rename`).then((res) => {
    console.log("res", res);
    return res.json();
  });
};
