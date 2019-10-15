from rest_framework.test import APITestCase
from django.urls import reverse



class EducationTests(APITestCase):
    def test_institutions_filter_by_type(self):
        """
        Ensure we can filter institutions by type
        """
        from education import dataHolder
        dataHolder.institution_data = [{'type':'1'}, {'type':'2'}]

        url = reverse('institution-list')
        response = self.client.get(url, {'type':'2'}, format='json')
        self.assertEqual(response.data, [{'type':'2'}])

    def test_institution_types(self):
        """
        Ensure that all types are returned with no ducplicates
        """
        from education import dataHolder
        dataHolder.institution_data = [{'type':'1'}, {'type':'2'}, {'type':'1'}]

        url = reverse('institution-types-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.data, {'1','2'})
