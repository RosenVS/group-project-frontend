import axios from "axios";
import {useAuth} from '../context/AuthProvider';
import {filterAndSearchProjects, getSavedFilterSettings, updateFilterSettings} from "./Helpers";
const baseURL = process.env.REACT_APP_URLsChecker_URL || 'http://localhost:8081/';
const ax = axios.create({
    baseURL: 'http://localhost:8081/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
    },
    withCredentials: true
});


ax.interceptors.request.use(function (config) {
    const {authState} = useAuth();

    if (authState && authState.accessToken) {
        config.headers.Authorization = `Bearer ${authState.accessToken}`;
    }

    return config;
});





function updateSentryProjects(projects, savedFilterData){
    let platforms = [];

    let item = savedFilterData.sortingOptions.find(obj => obj.title === "platform");

    if (!item) {
        item = {title: "platform", options: []};
        savedFilterData.sortingOptions.push(item);
    }
    platforms  = item.options;
    projects.forEach(d => {

        if (!platforms.some(i => i.title === d.platform)) {
            const k = platforms.find(i => i.title === d.platform);
            platforms.push({title: d.platform, isChecked: k ? k.isChecked : true});
        }
    });


    return {sortingOptions:[{
            title: "platform",
            options: platforms,
        }], search : savedFilterData.search};
}



function mapSentryData(data,organization) {
    // to be updated more if needed
    return data.map(item => ({
        id: item.id,
        name: item.name,
        type: 'sentry',
        platform: item.platform,
        organization: organization.name,
        latestRelease: item.latestRelease,
        latestResponse: new Date()
    }))
}

const getSentryProjects = async (token) => {
    
    const organizations = await GetOrganizations(token);
    const organization = "dad-7r";
    const ax = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': true,
            'Authorization': `Bearer ${token}` // Set the Authorization header here
        },
        withCredentials: false
    });
    var response  =  await ax.get(`https://sentry-service-hlfxsphkja-ew.a.run.app/api/projects/dad-7r`);
    console.log(response)
    if (response.status === 200) {
        return mapSentryData(response.data, organization);
        // map data and return
    }else return [];




    // let platforms = ['Windows', 'macOS', 'Linux', 'iOS', 'Android'];
    //
    // let sentryProjects = Array.from({length: 20}, (_, i) => ({
    //     id: `id${i + 1}`,
    //     type: 'sentry',
    //     name: `Project ${i + 1}`,
    //     organization: `Organization ${i}`,
    //     platform: platforms[i % platforms.length],
    //     idOnline: true,
    //     latestResponse: new Date()
    // }));

    // return sentryProjects;
}


export async function getSentryProjectsFiltered(token) {
    // get slug from storage somewhere
    const organizationSlug = "";
    const projects = await getSentryProjects(token, organizationSlug);
    // get any saved sorting data (cached)
    const savedFilterData = getSavedFilterSettings('sentryFilterSettings');
    // check filter to make sure that data is up-to-date, make sure they match each other
    const filterData = updateSentryProjects(projects, savedFilterData);
    // save newly update sorting options(cache)
    updateFilterSettings(filterData, 'sentryFilterSettings');
    // update data based on the sorting preferences and search data
    return filterAndSearchProjects(projects, filterData.sortingOptions, filterData.search);

}

const mapOrganizations = (response) => {
    return response.data.map(item => ({
        id: item.id,
        name: item.name,
        type: 'organization'
    }));
};


export async function GetOrganizations(token){
    try {
        const response = await ax.get(`${baseURL}/api/organizations`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true,
                'Authorization': `Bearer ${token}` // Set the Authorization header here
            },
        });
        return mapOrganizations(response.data);
        // return mapData(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
        //  throw error;
    }
}

export async function addOrganization(token, organization){
    try {
        const response = await ax.post(`${baseURL}/api/organizations`, organization, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true,
                'Authorization': `Bearer ${token}` // Set the Authorization header here
            },
        });
        return response.status;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

