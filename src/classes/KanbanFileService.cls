/**
 * Created by Vladyslav Lyfar on 29.10.2018.
 */

public class KanbanFileService {

    @future (callout=true)
    public static void deleteKanbanFile(Id kanbanFileId, String kanbanFileName) {
        ExternalServicesAPI.DropboxAPI dropboxAPI = new ExternalServicesAPI.DropboxAPI();
        HttpResponse deleteFileResponse = dropboxAPI.deleteFileFromDropbox(kanbanFileName);
        if(deleteFileResponse.getStatusCode() == 200) {
            KanbanFileRepository.deleteKanbanFileById(kanbanFileId);
        }
    }

    public KanbanFile__c deleteKanbanFileFromOrg(KanbanFile__c kanbanFile) {
        return KanbanFileRepository.deleteKanbanFile(kanbanFile);
    }

    public String renameDuplicate(String fileName) {
        Integer duplicatesCount = [SELECT Count() FROM KanbanFile__c WHERE Name LIKE :fileName+'%'];
        return duplicatesCount > 0 ? fileName + '(' + duplicatesCount + ')' : fileName;
    }

}