/**
 * Created by Vladyslav Lyfar on 29.10.2018.
 */

public class KanbanFileService {

    public KanbanFile__c deleteKanbanFile(KanbanFile__c kanbanFile) {
        ExternalServicesAPI.DropboxAPI dropboxAPI = new ExternalServicesAPI.DropboxAPI();
        HttpResponse deleteFileResponse = dropboxAPI.deleteFileFromDropbox(kanbanFile.Name);
        if(deleteFileResponse.getStatusCode() == 200) {
            delete kanbanFile;
            return kanbanFile;
        }
        return null;
    }

}