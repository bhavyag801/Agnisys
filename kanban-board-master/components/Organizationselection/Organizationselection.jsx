import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Organizationselection.css"; // Adjust filename if necessary

const OrganizationPageSelector = ({ setOrganization, setPage }) => {
  const [orgList, setOrgList] = useState(
    localStorage.getItem("organizations")
      ? JSON.parse(localStorage.getItem("organizations"))
      : []
  );

  const [showOrganizations, setShowOrganizations] = useState(false); // State to control visibility of organization containers
  const [showAddOrg, setShowAddOrg] = useState(false); // State to control the visibility of the add organization input
  const [newOrgName, setNewOrgName] = useState('');
  const [openOrgOptions, setOpenOrgOptions] = useState(null); // Track which organization's options are open
  const [addPageOrgId, setAddPageOrgId] = useState(null); // Track which organization is adding a page
  const [newPageName, setNewPageName] = useState(''); // Track the new page name
  const [openPageOptions, setOpenPageOptions] = useState(null); // Track which page's options are open
  const [showPageList, setShowPageList] = useState({}); // Track visibility of page list for each organization

  const addOrganization = () => {
    if (!newOrgName) return;
    const newOrg = { id: uuidv4(), name: newOrgName, pages: [], members: [] };
    const updatedOrgList = [...orgList, newOrg];
    setOrgList(updatedOrgList);
    localStorage.setItem("organizations", JSON.stringify(updatedOrgList));
    setNewOrgName(''); // Clear the input field after adding the organization
    setShowAddOrg(false); // Hide the add organization input after adding the organization
  };

  const addPageToOrganization = (orgId) => {
    if (!newPageName) return;
    const updatedOrgList = orgList.map((org) => {
      if (org.id === orgId) {
        return { ...org, pages: [...org.pages, { id: uuidv4(), name: newPageName }] };
      }
      return org;
    });
    setOrgList(updatedOrgList);
    localStorage.setItem("organizations", JSON.stringify(updatedOrgList));
    setNewPageName(''); // Clear the input field after adding the page
    setAddPageOrgId(null); // Reset the organization adding page after submission
  };

  const deleteOrganization = (orgId) => {
    const updatedOrgList = orgList.filter(org => org.id !== orgId);
    setOrgList(updatedOrgList);
    localStorage.setItem("organizations", JSON.stringify(updatedOrgList));
  };

  const deletePageFromOrganization = (orgId, pageId) => {
    const updatedOrgList = orgList.map((org) => {
      if (org.id === orgId) {
        const updatedPages = org.pages.filter(page => page.id !== pageId);
        return { ...org, pages: updatedPages };
      }
      return org;
    });
    setOrgList(updatedOrgList);
    localStorage.setItem("organizations", JSON.stringify(updatedOrgList));
  };

  const toggleOptions = (orgId) => {
    setOpenOrgOptions(openOrgOptions === orgId ? null : orgId);
  };

  const openAddPageInput = (orgId) => {
    setAddPageOrgId(orgId); // Set the organization id for which we are adding a page
  };

  const togglePageOptions = (pageId) => {
    setOpenPageOptions(openPageOptions === pageId ? null : pageId);
  };

  const togglePageListVisibility = (orgId) => {
    setShowPageList(prevState => ({
      ...prevState,
      [orgId]: !prevState[orgId]
    }));
  };

  return (
    <div className="organization-page-selector">
      <div className="header-with-icon">
        <button
          className="toggle-org-button"
          onClick={() => setShowOrganizations(!showOrganizations)}
        >
          <i className={`fas fa-chevron-${showOrganizations ? 'down' : 'right'}`}></i>
        </button>
        <h2>Organizations</h2>
        <button
          className="add-icon-button"
          onClick={() => setShowAddOrg(!showAddOrg)}
        >
          +
        </button>
      </div>
      {showAddOrg && (
        <div className="add-organization-input">
          <input
            type="text"
            placeholder="Enter Organization Name"
            value={newOrgName}
            onChange={(e) => setNewOrgName(e.target.value)}
          />
          <button onClick={addOrganization}>Add</button>
        </div>
      )}
      {showOrganizations && orgList.map((org) => (
        <div key={org.id} className="organization">
          <div className="organization-header">
            <button
              className="toggle-page-list-button"
              onClick={() => togglePageListVisibility(org.id)}
            >
              <i className={`fas fa-chevron-${showPageList[org.id] ? 'down' : 'right'}`}></i>
            </button>
            <h3>{org.name}</h3>
            <div className="options-dropdown">
              <div
                className="options-trigger"
                onClick={() => toggleOptions(org.id)}
              >
                &#8942; {/* Three dots character */}
              </div>
              {openOrgOptions === org.id && (
                <div className="options-content">
                  <div
                    className="option"
                    onClick={() => {
                      // Handle edit option
                      // Example: Implement a modal or inline editing
                      console.log(`Editing ${org.name}`);
                    }}
                  >
                    Edit
                  </div>
                  <div
                    className="option"
                    onClick={() => {
                      // Handle add members option
                      // Example: Implement a modal or input field for adding members
                      console.log(`Adding members to ${org.name}`);
                    }}
                  >
                    Add Members
                  </div>
                  <div
                    className="option"
                    onClick={() => openAddPageInput(org.id)}
                  >
                    Add Page
                  </div>
                  <div
                    className="option delete-option"
                    onClick={() => deleteOrganization(org.id)}
                  >
                    Delete
                  </div>
                </div>
              )}
            </div>
          </div>
          {showPageList[org.id] && (
            <div className="page-container">
              {org.pages.map((page) => (
                <div key={page.id} className="page-container-item">
                  <div className="page" onClick={() => {
                    setOrganization(org.name);
                    setPage(page.name);
                  }}>
                    {page.name}
                    <div
                      className="page-options-trigger"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        togglePageOptions(page.id);
                      }}
                    >
                      &#8942; {/* Three dots character */}
                    </div>
                    {openPageOptions === page.id && (
                      <div className="page-options-content">
                        <div
                          className="page-option"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            // Handle edit page option
                            console.log(`Editing ${page.name}`);
                          }}
                        >
                          Edit
                        </div>
                        <div
                          className="page-option delete-option"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            deletePageFromOrganization(org.id, page.id);
                          }}
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {addPageOrgId === org.id && (
            <div className="add-page-input">
              <input
                type="text"
                placeholder="Enter Page Name"
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
              />
              <button onClick={() => addPageToOrganization(org.id)}>
                Add
              </button>
            </div>
          )}
        </div>
      ))}
      <div className="additional-headers">
        <div className="header-with-icon">
          <button className="toggle-header-button">
            <i className="fas fa-users"></i>
          </button>
          <h2>Members</h2>
        </div>
        <div className="header-with-icon">
          <button className="toggle-header-button">
            <i className="far fa-comments"></i>
          </button>
          <h2>DM's</h2>
        </div>
        <div className="header-with-icon">
          <button className="toggle-header-button">
            <i className="fas fa-bars-progress"></i>
          </button>
          <h2>Projects</h2>
        </div>
        <div className="header-with-icon">
          <button className="toggle-header-button">
            <i className="far fa-bell"></i>
          </button>
          <h2>Activity</h2>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPageSelector;
