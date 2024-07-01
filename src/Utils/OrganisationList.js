import axios from 'axios';

const organisationList = await getOrganizationNames();

async function getOrganizationNames() {
  try {

    const response = await axios.get('http://localhost:8080/organisation');
    const organizationData = response.data.data;
    if (organizationData && Array.isArray(organizationData.organisationDTOViewList)) {
      const organizationNames = organizationData.organisationDTOViewList.map(org => org.name);
      return organizationNames;
    } else {
      console.error('Unexpected data format:', organizationData);
      return ['No Data'];
    }
  } catch (error) {
    console.error('Error fetching organization data:', error);
    return ['No Data'];
  }
}

export default organisationList;
