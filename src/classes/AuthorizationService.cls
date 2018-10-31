/**
 * Created by Vladyslav Lyfar on 30.10.2018.
 */

public class AuthorizationService {

    public String getDropboxAccessToken(String authorizationCode) {
        ExternalServicesAPI.DropboxAPI dropboxAPI = new ExternalServicesAPI.DropboxAPI();
        return dropboxAPI.getAccessToken(authorizationCode);
    }

    public Boolean checkAuthorization() {
        DropboxAPIAccess__c dropboxAPIAccessCS = DropboxAPIAccess__c.getInstance();
        return dropboxAPIAccessCS.Token_Expire_Date__c > Date.today();
    }

}