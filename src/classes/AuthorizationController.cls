/**
 * Created by Vladyslav Lyfar on 30.10.2018.
 */

public with sharing class AuthorizationController {

    @AuraEnabled
    public static String getDropboxAccessTokenString(String authorizationCode) {
        return new AuthorizationService().getDropboxAccessToken(authorizationCode);
    }

}