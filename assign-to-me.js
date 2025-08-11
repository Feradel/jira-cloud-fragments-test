(function () {
  AP.user.getUser(function(user) {
    const accountId = user.atlassianAccountId;
    console.log("✅ Current user accountId:", accountId);
  
    const button = document.getElementById('assign-button');
    if (button) {
      button.addEventListener('click', function () {
        AP.context.getContext(function(context) {
          const issueKey = context.jira.issue.key;
          console.log("✅ Issue key:", issueKey);
  
          AP.request({
            url: `/rest/api/3/issue/${issueKey}/assignee`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ accountId: accountId }),
            success: function () {
              console.log("✅ Issue assigned successfully");
            },
            error: function (err) {
              console.error("❌ Failed to assign issue:", err);
            }
          });
        });
      });
    } else {
      console.error("❌ Button not found");
    }
  });
})();
