// TODO: Create an interface for the Candidate objects returned by the API
// An interface is the structure of how our object should look
// Candidate needs to have the following properties:
// name, username, location, avatar, email, html_url, company

// The name and username are the same as the login


export interface Candidate {
    name: string;
    login: string;
    location: string;
    avatar: string;
    email: string;
    html_url: string;
    company: string;
}