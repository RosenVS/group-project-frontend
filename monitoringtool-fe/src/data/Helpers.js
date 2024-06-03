
export function getSavedFilterSettings(title) {
    // stored options are kept in session storage
    const storedJsonString = sessionStorage.getItem(title);
    return JSON.parse(storedJsonString) ?? {sortingOptions: [], search: ""};
}

export function filterAndSearchProjects(projects, sortingOptions, searchValue) {
    // Filter projects based on sorting options
    const filteredProjects = projects.filter(project => {
        return sortingOptions.every(option => {
            // If the project doesn't have the property, include it in the result
            if (!project.hasOwnProperty(option.title)) {
                return true;
            }
            // If the project has the property, check if the value is in the checked options
            return option.options.some(opt => project[option.title] === opt.title && opt.isChecked);
        });
    });
    // If a search value is provided, filter the projects based on the search value
    searchProjects(projects, searchValue)

    return filteredProjects;
}
export function searchProjects(projects, searchValue) {
    if (searchValue.length > 0) {
        return projects.filter(project => {
            return Object.keys(project).some(key => {
                return key !== 'id' && project[key].toString().toLowerCase().includes(searchValue.toLowerCase());
            });
        });
    }
    return projects;
}



export function updateFilterSettings(updated, title) {

    const jsonString = JSON.stringify(updated);
    sessionStorage.setItem(title, jsonString);
}