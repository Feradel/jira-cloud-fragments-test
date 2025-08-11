(function () {
  const currentUser = JIRA.Users.CurrentUser.username; // Gets the current user's username

  // Replace 'your-button-id' with the actual ID of your button
  document.getElementById('assign-button').addEventListener('click', function () {
    const issueKey = JIRA.Issue.getIssueKey(); // Gets the current issue key
    
    console.log("Script loaded");
    console.log("User accountId:", accountId);
    console.log("Issue key:", issueKey);


    AP.request({
      url: `/rest/api/3/issue/${issueKey}/assignee`,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ accountId: currentUser }),
      success: function () {
        alert('Issue assigned to you!');
      },
      error: function (err) {
        console.error('Failed to assign issue:', err);
        alert('Failed to assign issue.');
      }
    });
  });
})();
