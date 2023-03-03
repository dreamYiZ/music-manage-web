const BASR_URL = 'http://localhost:9100/api/'

const fetchData = (path='') => {
  return fetch(`${BASR_URL}${path}`);
};

export const getMusicList = () => {
    fetchData('scans-folder').then(res=>{
        console.log('res', res)
    })
};
