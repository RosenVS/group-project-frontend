import axios from "axios";
import {filterAndSearchProjects, getSavedFilterSettings, updateFilterSettings} from "./Helpers";


const baseURL = process.env.REACT_APP_URLsChecker_URL || 'http://localhost:8081/';

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
        slug: item.slug,
        type: 'sentry',
        platform: item.platform,
        organization: organization.organizationsID,
        latestResponse: new Date()
    }))
}

const getSentryProjects = async (token) => {
    const organizations = await GetOrganizations(token);

    const ax = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': true,
            'Authorization': `Bearer ${token}`
        },
        withCredentials: false
    });

    const projectsPromises = organizations.map((organization) =>
        ax.get(`https://sentry-service-hlfxsphkja-ew.a.run.app/api/projects/${organization.organizationsID}`)
    );

    const responses = await Promise.all(projectsPromises);

    const projects = responses.reduce((acc, response, index) => {
        if (response.status === 200) {
            const organizationProjects = mapSentryData(response.data, organizations[index]);
            return [...acc, ...organizationProjects];
        }
        return acc;
    }, []);

    return projects;
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

    return response.map(item => ({
        id: item.id,
        organizationsID: item.organizationsID,
        integrationToken:item.integrationToken,
        type: 'organization'
    }));
};
const mapIssues = (issues) => {

    return  issues.map(issue => ({
        type:"issue",
        id: issue.id,
        title: issue.title,
        level: issue.level,
        status: issue.status,
        firstSeen: issue.firstSeen,
        lastSeen: issue.lastSeen,
        count: issue.count,
        userCount: issue.userCount,
        platform: issue.platform,
        culprit: issue.culprit
    }));

}

export async function GetOrganizations(token){
    try {
        const ax = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true,
                'Authorization': `Bearer ${token}`
            },
            withCredentials: false
        });
        const response = await ax.get(`https://sentry-service-hlfxsphkja-ew.a.run.app/api/organizations`);
        return mapOrganizations(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function addOrganization(token, organization){
    try {
        const ax = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true,
                'Authorization': `Bearer ${token}`
            },
            withCredentials: false
        });
        const response = await ax.post(`https://sentry-service-hlfxsphkja-ew.a.run.app/api/organizations`, organization);
        return response.status;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
export async function deleteOrganization(token, id){
    try {
        const ax = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true,
                'Authorization': `Bearer ${token}`
            },
            withCredentials: false
        });
         const response = await ax.delete(`https://sentry-service-hlfxsphkja-ew.a.run.app/api/organizations/${id}`);

        return response.status;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function  getSentryIssues(token, organization, slug){
    try {
        const ax = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true,
                'Authorization': `Bearer ${token}` // Set the Authorization header here
            },
            withCredentials: false
        });
        const response = await ax.get(`https://sentry-service-hlfxsphkja-ew.a.run.app/api/projects/${organization}/${slug}`);
        return mapIssues(response.data)
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
