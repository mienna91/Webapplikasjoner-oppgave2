import React from 'react';

const CompletedList = () => (
  <section id="completeSection">
    <h4 id="completeTitle">Completed todos</h4>
    <form id="formComplete">
      <label htmlFor="filterCheckBox" id="checkBoxLbl">
        Filter by date
      </label>
      <input type="checkbox" name="filterCheckBox" id="filterCheckbox" />
    </form>
    <table id="completeTable">
      <thead id="tblHeader">
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Description</th>
          <th>Completed date</th>
        </tr>
      </thead>
    </table>
  </section>
);

export default CompletedList;
