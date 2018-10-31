/**
 * Created by Vladyslav Lyfar on 25.10.2018.
 */

public with sharing class ExternalServicesAPI {

    public class DropboxAPI {

        private String accessToken = 'c6TzLjmN86AAAAAAAAAAZzEBI_CDSPY_YjPwYMWPp1MADduOMYFhsgmv36Ikzc0q';
        private final String dropboxFolderName = 'KanbanCardsAttachments';
        private final String authorizeString =
                'https://www.dropbox.com/oauth2/authorize?client_id=fzjme6a3fotawvs&response_type=code&redirect_uri=https://cunning-goat-l5flx3-dev-ed.lightning.force.com/c/DropboxAPICallback.app';
        private final String authCode = 'c6TzLjmN86AAAAAAAAAAaWa6QQ7T_9pVudENud_mu1A';
        private final String clientSecret = '4wo5lgqkalu2b51';
        private final String clientId = 'fzjme6a3fotawvs';
        private final String redirectURI = 'https://cunning-goat-l5flx3-dev-ed.lightning.force.com/c/DropboxAPICallback.app';

        public DropboxAPI() {
            //this.accessTokenToken = test();
        }

        public HttpResponse addNewFile(String fileName, String base64file) {
            Http http = new Http();
            HttpRequest httpRequest = new HttpRequest();
            httpRequest.setEndpoint(KanbanConstants.dropBoxContentApiUrl + '/2/files/upload');

            httpRequest.setMethod('POST');

            httpRequest.setHeader('Authorization', 'Bearer ' + accessToken);
            httpRequest.setHeader('Dropbox-API-Arg', '{"path": "/' + dropboxFolderName + '/' + fileName + '", "mode":{".tag":"add"}, "autorename":true }');
            httpRequest.setHeader('Content-Type', 'application/octet-stream');
            httpRequest.setHeader('Accept', 'application/json');

            if (String.isNotBlank(base64file)) {
                httpRequest.setBodyAsBlob(EncodingUtil.base64Decode(base64file));
            }

            HttpResponse httpResponse = http.send(httpRequest);
            return httpResponse;
        }

        public HttpResponse createSharedLink(String fileName) {
            String url = KanbanConstants.dropBoxApiUrl + '/2/sharing/create_shared_link_with_settings';
            String body = '{"path": "/' + dropboxFolderName + '/' + fileName + '", "settings": {"requested_visibility": "public"}}';
            return makeHttpCallout(url, 'POST', body);
        }

        public HttpResponse deleteFileFromDropbox(String fileName) {
            String url = KanbanConstants.dropBoxApiUrl + '/2/files/delete_v2';
            String body = '{"path": "/' + dropboxFolderName + '/' + fileName + '"}';
            return makeHttpCallout(url, 'POST', body);
        }

        public String getAccessToken(String authorizationCode) {
            Http http = new Http();
            HttpRequest httpRequest = new HttpRequest();
            httpRequest.setEndpoint(KanbanConstants.dropBoxApiUrl + '/oauth2/token?code=' + authorizationCode +
                    '&client_secret=' + clientSecret +
                    '&grant_type=authorization_code' +
                    '&client_id=' + clientId +
                    '&redirect_uri=' + redirectURI);
            httpRequest.setMethod('POST');

            httpRequest.setHeader('Accept', 'application/json');

            HttpResponse httpResponse = http.send(httpRequest);
            if(httpResponse.getStatusCode() == 200) {
                Map<String, Object> tokenResponseMap = (Map<String, Object>) JSON.deserializeUntyped(httpResponse.getBody());
                String accessToken = (String) tokenResponseMap.get('access_token');
                DropboxAPIAccess__c dropboxAPIAccessCS = DropboxAPIAccess__c.getInstance();
                dropboxAPIAccessCS.Access_Token__c = accessToken;
                dropboxAPIAccessCS.Token_Expire_Date__c = Date.today().addDays(14);
                update dropboxAPIAccessCS;
                return accessToken;
            }

            return null;
        }

        private HttpResponse makeHttpCallout(String url, String method, String body) {
            Http http = new Http();
            HttpRequest httpRequest = new HttpRequest();
            httpRequest.setEndpoint(url);
            httpRequest.setMethod(method);

            httpRequest.setHeader('Content-Type', 'application/json');
            httpRequest.setHeader('Accept', 'application/json');
            httpRequest.setHeader('Authorization', 'Bearer ' + accessToken);

            if (String.isNotBlank(body)) {
                httpRequest.setBody(body);
            }
            return http.send(httpRequest);
        }

    }

}