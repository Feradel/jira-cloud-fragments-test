document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('assign-button'); // your button's ID

    if (!button) {
        console.error("Assign to Me button not found in DOM");
        return;
    }

    button.addEventListener('click', function () {
        if (typeof AP === "undefined") {
            console.error("AP is not defined — ensure all.js is loaded first.");
            return;
        }

        // Replace this with however you're passing the issue key
        var issueKey = button.getAttribute('data-issue-key');

        if (!issueKey) {
            console.error("No issue key found for assign action.");
            return;
        }

        AP.user.getCurrentUser(function (user) {
            if (!user || !user.accountId) {
                console.error("Could not get current user's accountId");
                return;
            }

            AP.request({
                url: '/rest/api/3/issue/' + encodeURIComponent(issueKey),
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    fields: {
                        assignee: { accountId: user.accountId }
                    }
                }),
                success: function () {
                    console.log("Assigned " + issueKey + " to " + user.displayName);
                },
                error: function (xhr) {
                    console.error("Assignment failed:", xhr);
                }
            });
        });
    });
});
