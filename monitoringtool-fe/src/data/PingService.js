import axios from "axios";
import { useAuth } from '../context/AuthProvider';
import {getSavedFilterSettings, searchProjects, updateFilterSettings} from "./Helpers";

const baseURL = process.env.REACT_APP_URLsChecker_URL || 'http://localhost:5132';

const ax = axios.create({
    baseURL: baseURL
});

ax.interceptors.request.use(function (config) {
    // const { authState } = useAuth();

    // if (authState && authState.accessToken) {
    //  config.headers.Authorization = `Bearer ${authState.accessToken}`;
    // }

    return config;
});

export async function GetAllPingProjects() {
    try {
        const response = await ax.get("http://localhost:5132/api/URLsChecker", {
            headers: { 'Content-Type': 'application/json' }
        });
        return mapData(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
   // returns: [
   // {
   //     "id": "00000000-0000-0000-0000-000000000000",
   //     "healthUrl": "https://radev.software/",
   //     "name": "WebValidationClient Sprint9",
   //     "isUp": false,
   //     "lastChecked": "2024-05-14T11:40:32.7495677+02:00",
   //     "lastResponse": null
   //  }
   //] 


}
function mapData(data) {
    return data.map(item => ({
        type: 'curler',
        isOnline: item.isUp,
        name: item.name,
        url: item.healthUrl,
        lastChecked: item.lastChecked,
        IsInitializing: item.IsInitializing,
        lastResponse: new Date(item.lastResponse),

    }));
}


const getCurlerProjects = async (token) => {

    try {
        const response = await ax.get("http://localhost:5132/api/URLsChecker", {
            headers: { 'Content-Type': 'application/json' }
        });
        return mapData(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
      return [];
    }


    // let curlerProjects = Array.from({length: 20}, (_, i) => ({
    //     id: `id${i + 1}`,
    //     title: `Project ${i + 1}`,
    //     Organizations: `Organization ${i}`,
    //     isOnline: i % 2 === 0,
    //     url:"http://title/service",
    //     lastChecked: Date.now()
    // }));

    // return curlerProjects;
}

export async function getCurlerProjectsFiltered(token){
    const projects = await getCurlerProjects(token);
    // get any saved sorting data (cached)
    const filterData = getSavedFilterSettings('curlerFilterSettings');
    // save newly update sorting options(cache)
    updateFilterSettings(filterData, 'curlerFilterSettings');
    // update data based on the sorting preferences and search data
    return searchProjects(projects, filterData.search);

}