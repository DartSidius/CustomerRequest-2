/**
 * Created by Vladyslav Lyfar on 25.10.2018.
 */

public with sharing class ExternalServicesAPI {

    public class DropboxAPI {

        private String accessToken = '';

        public DropboxAPI() {

        }

        public void createNewFileRequest() {
            String url =  KanbanConstants.dropBoxApiUrl + '/2/file_requests/create';
            String body = '{"title": "Homework submission","destination": "/File Requests/KanbanCardsAttachments","open": true}';
            HttpResponse response = this.makeHttpCallout(url, 'POST', body);
        }

        public void createNewFolder() {
            String url = KanbanConstants.dropBoxApiUrl + '/2/files/create_folder_v2';
            String body = '{"path": "/KanbanCardsAttachments", "autorename": false}';
            HttpResponse response = this.makeHttpCallout(url, 'POST', body);
        }

        public void addNewFile(Blob file) {
            String url = KanbanConstants.dropBoxContentApiUrl + '/2/files/upload';
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