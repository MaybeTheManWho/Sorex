import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Path to the JSON file that will store contact requests
const contactsFilePath = path.join(process.cwd(), 'data', 'contacts.json');

// Ensure the data directory exists
const ensureDataDirExists = () => {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Read contacts from file
const readContacts = () => {
  ensureDataDirExists();
  
  if (!fs.existsSync(contactsFilePath)) {
    // If file doesn't exist, return empty array
    return [];
  }
  
  try {
    const data = fs.readFileSync(contactsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts file:', error);
    return [];
  }
};

// Write contacts to file
const writeContacts = (contacts) => {
  ensureDataDirExists();
  
  try {
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error('Error writing contacts file:', error);
    throw error;
  }
};

// GET handler - retrieve all contact requests
export async function GET() {
  try {
    const contacts = readContacts();
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error getting contacts:', error);
    return NextResponse.json(
      { message: 'Error fetching contact requests' },
      { status: 500 }
    );
  }
}

// POST handler - create a new contact request
export async function POST(request) {
  try {
    const { name, email, message } = await request.json();
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Create new contact request
    const newContact = {
      id: uuidv4(),
      name,
      email,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    };
    
    // Get existing contacts
    const contacts = readContacts();
    
    // Add new contact
    contacts.push(newContact);
    
    // Save to file
    writeContacts(contacts);
    
    return NextResponse.json(
      { message: 'Contact request submitted successfully', contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { message: 'Error submitting contact request' },
      { status: 500 }
    );
  }
}

// PUT handler - update a contact request (mark as read)
export async function PUT(request) {
  try {
    const { id, read } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { message: 'Contact ID is required' },
        { status: 400 }
      );
    }
    
    // Get existing contacts
    const contacts = readContacts();
    
    // Find the contact to update
    const contactIndex = contacts.findIndex(contact => contact.id === id);
    
    if (contactIndex === -1) {
      return NextResponse.json(
        { message: 'Contact not found' },
        { status: 404 }
      );
    }
    
    // Update the contact
    contacts[contactIndex] = {
      ...contacts[contactIndex],
      read: read !== undefined ? read : contacts[contactIndex].read,
    };
    
    // Save to file
    writeContacts(contacts);
    
    return NextResponse.json({
      message: 'Contact updated successfully',
      contact: contacts[contactIndex],
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { message: 'Error updating contact' },
      { status: 500 }
    );
  }
}

// DELETE handler - delete a contact request
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { message: 'Contact ID is required' },
        { status: 400 }
      );
    }
    
    // Get existing contacts
    const contacts = readContacts();
    
    // Filter out the contact to delete
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    
    // If the length is the same, the contact wasn't found
    if (contacts.length === updatedContacts.length) {
      return NextResponse.json(
        { message: 'Contact not found' },
        { status: 404 }
      );
    }
    
    // Save to file
    writeContacts(updatedContacts);
    
    return NextResponse.json({
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { message: 'Error deleting contact' },
      { status: 500 }
    );
  }
}