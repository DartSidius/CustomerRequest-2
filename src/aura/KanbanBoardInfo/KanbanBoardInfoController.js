/**
 * Created by Vladyslav Lyfar on 09.10.2018.
 */
({
    showRenameForm: function(component) {
        let isRenameFormOpened = component.get("v.isRenameFormOpened");
        isRenameFormOpened = !isRenameFormOpened;
        component.set("v.isRenameFormOpened", isRenameFormOpened);
    }
})