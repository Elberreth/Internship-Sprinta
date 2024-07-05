import axios from 'axios';

const organisationList = await getOrganisationNames();

async function getOrganisationNames() {
  try {

    const response = await axios.get('http://localhost:8080/organisation');
    const organisationData = response.data.data;
    if (organisationData && Array.isArray(organisationData.organisationDTOViewList)) {
      const organisationNames = organisationData.organisationDTOViewList.map(org => org.name);
      return organisationNames;
    } else {
      console.error('Unexpected data format:', organisationData);
      return ['No Data'];
    }
  } catch (error) {
    console.error('Error fetching organisation data:', error);
    return ['No Data'];
  }
}

export default organisationList;
