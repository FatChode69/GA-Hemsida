//Laddar in informationen i recepthemsidan
var receptID = (new URLSearchParams(window.location.search)).get('receptID');
laddaRecept(receptID);