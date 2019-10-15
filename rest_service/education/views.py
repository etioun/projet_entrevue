from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
# @cache_page(60 * 60)
def institution_list(request):
    """
    List all institutions
    """

    from . import dataHolder

    if 'types' in request.GET:
        types = request.GET['types'].split(',')
        out = [i for i in dataHolder.institution_data if i['type'] in types]
    else:
        out = dataHolder.institution_data

    return Response(out)


@api_view(['GET'])
# @cache_page(60 * 60)
def institution_type_list(request):
    """
    List all institution types
    """
    from . import dataHolder

    out = set()

    for i in dataHolder.institution_data:
        out.add(i.get('type'))

    return Response(out)
