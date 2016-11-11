import React, { Component } from 'react';

export const styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#424b5b"},{"weight":2},{"gamma":"1"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#545b6b"},{"gamma":"0"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#545b6b"},{"gamma":"1"},{"weight":"10"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#666c7b"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#545b6b"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#424a5b"},{"lightness":"0"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#666c7b"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2e3546"}]}]

export const iconURLs = {
  'Active Rat Signs': '/public/images/purple-sm.png',
  'Problem Conditions': '/public/images/red-sm.png',
  'Passed Inspection': '/public/images/green-sm.png',
  'Bait applied': '/public/images/yellow-sm.png',
  'Monitoring visit': '/public/images/gray-sm.png',
  'Cleanup done': '/public/images/pink-sm.png'
};

export const createInfoBox = inspection => (
  <div>
      <h4>{inspection.house_number || ''} {inspection.street_name}</h4>
      <p>Status: ${inspection.result}</p>
      <p>Inspection Date: {inspection.inspection_date.slice(0, 10)}</p>
    </div>
 );
