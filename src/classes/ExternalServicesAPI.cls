/**
 * Created by Vladyslav Lyfar on 25.10.2018.
 */

public with sharing class ExternalServicesAPI {

    public class DropboxAPI {

        private String accessToken = 'c6TzLjmN86AAAAAAAAAAQdj6nU9RmKTqBwKT5maaTn91_PHY0VDNI0RWWdUiCQZ5';
        private final String dropboxFolderName = 'KanbanCardsAttachments';

        public DropboxAPI() {

        }

        public HttpResponse addNewFile(String fileName, String base64file) {
            Http http = new Http();
            HttpRequest httpRequest = new HttpRequest();
            httpRequest.setEndpoint(KanbanConstants.dropBoxContentApiUrl + '/2/files/upload');

            httpRequest.setMethod('POST');

            httpRequest.setHeader('Authorization', 'Bearer ' + accessToken);
            httpRequest.setHeader('Dropbox-API-Arg', '{"path": "/' + dropboxFolderName + '/' + fileName + '", "mode": "add", "autorename": true, "mute": false, "strict_conflict": false}');
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

        private String getAccessToken() {
            String token = '';
            return token;
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