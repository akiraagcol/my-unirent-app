// src/config.js

// This automatically grabs whatever IP or localhost you typed into your browser!
const CURRENT_IP = window.location.hostname;

export const API_BASE_URL = `http://${CURRENT_IP}:8000/api`;