/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

public class KanbanCardService {

    public KanbanCard__c createNewKanbanCard(KanbanCard__c kanbanCard) {
        return KanbanCardRepository.createNewKanbanCard(kanbanCard);
    }

    public KanbanCard__c updateKanbanCard(KanbanCard__c kanbanCard) {
        return KanbanCardRepository.updateKanbanCard(kanbanCard);
    }

    public KanbanCard__c copyKanbanCard(KanbanCard__c kanbanCard) {
        KanbanCard__c newKanbanCard = kanbanCard.clone(false, true, true, false);
        return KanbanCardRepository.createNewKanbanCard(newKanbanCard);
    }

    public List<KanbanCard__c> getAllKanbanCards(Id columnId) {
        return KanbanCardRepository.getAllKanbanCardsByColumnId(columnId);
    }

    public KanbanCard__c deleteKanbanCard(KanbanCard__c kanbanCard) {
        return KanbanCardRepository.deleteKanbanCard(kanbanCard);
    }

    public KanbanFile__c addAttachmentRelatedToKanbanCard(Id kanbanCardId, String fileName, String base64file) {
        ExternalServicesAPI.DropboxAPI dropboxAPI = new ExternalServicesAPI.DropboxAPI();
        String base64Data = EncodingUtil.urlDecode(base64file, 'UTF-8');
        fileName = new KanbanFileService().renameDuplicate(fileName);
        HttpResponse addNewFileResponse = dropboxAPI.addNewFile(fileName, base64Data);
        if (addNewFileResponse.getStatusCode() == 200) {
            HttpResponse sharedLinkResponse = dropboxAPI.createSharedLink(fileName);
            Map<String, Object> sharedLinkResonseData = (Map<String, Object>) JSON.deserializeUntyped(sharedLinkResponse.getBody());
            String fileUrl = (String) sharedLinkResonseData.get('url');
            KanbanFile__c kanbanFile = new KanbanFile__c(
                    Name=fileName,
                    FileUrl__c=fileUrl,
                    KanbanCard__c=kanbanCardId
            );
            insert kanbanFile;
            return kanbanFile;
        }
        return null;
    }


}