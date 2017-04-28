import $ from 'jquery';

/**
 * Show the maintenance mode message to store administrators
 * @param maintenanceMode
 */
export default function (maintenanceMode = {}) {
    const header = maintenanceMode.header;
    const notice = maintenanceMode.notice;
    const password = maintenanceMode.password;
    const securePath = maintenanceMode.secure_path;

    // Return if header & notice is null or if securePath is not defined (means inside theme editor)
    if (!(header && notice) || !securePath) {
        return;
    }

    if (password) {
        const $element = $('<div>', {
            class: 'adminBar',
        });

        $element.html(`<div class="adminBar-logo">
            <a href="${securePath}/manage/dashboard"><svg><use xlink:href="#logo-small"></use></svg></a></div>
            <div class="adminBar-content">
                <a href="${securePath}/manage/theme-editor" target="_blank">Customize Theme</a>
                <div class="adminBar-private">
                    <span>Your storefront is private.</span>
                    <span class="preview">Share your site with preview code: ${password}</span>
                </div>
            </div>`);

        // `redirectIframeUrl` param format is `url1/url2/url3`
        const attachThemeEditorParams = (evt) => {
            evt.preventDefault();

            const params = window.location.href.split('/').splice(3);
            const redirectIframeUrl = params.reduce((acc, param) => `${acc}/${param}`, '').slice(1);
            let themeEditorUrl = `${evt.target.href}`;

            if (redirectIframeUrl) {
                themeEditorUrl = `${themeEditorUrl}?redirectIframeUrl=${redirectIframeUrl}`;
            }

            return window.open(themeEditorUrl, '_blank');
        };

        $('body').addClass('hasAdminBar');
        $('body').prepend($element);

        $('.adminBar-content a').click(attachThemeEditorParams);
    } else {
        const $element = $('<div>', {
            id: 'maintenance-notice',
            class: 'maintenanceNotice',
        });


        $element.html(`<p class="maintenanceNotice-header">${header}</p>${notice}`);

        $('body').append($element);
    }
}
