/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    togglePopover: function(component) {
        let customPopover = component.find("customPopover");
        $A.util.toggleClass(customPopover, "is-show");
    }
})