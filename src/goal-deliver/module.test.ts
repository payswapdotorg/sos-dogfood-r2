import { test } from 'tap';
import Fastify from 'fastify';
import noteService from './module';

// Mock the Fastify instance
const fastify = Fastify({
  logger: false
});

// Register the plugin
fastify.register(noteService);

test('GET /notes should return all notes', async (t) => {
  const response = await fastify.inject({
    method: 'GET',
    url: '/notes'
  });
  
  t.equal(response.statusCode, 200);
  t.same(JSON.parse(response.payload), []);
  t.end();
});

// Test creating a note
// Test retrieving a note by ID
// Test updating a note
// Test deleting a note

test('POST /notes should create a new note', async (t) => {
  const newNote = {
    title: 'Test Note',
    content: 'This is a test note'
  };
  
  const response = await fastify.inject({
    method: 'POST',
    url: '/notes',
    payload: newNote
  });
  
  t.equal(response.statusCode, 200);
  const responseBody = JSON.parse(response.payload);
  t.equal(responseBody.title, newNote.title);
  t.equal(responseBody.content, newNote.content);
  t.ok(responseBody.id);
  t.ok(responseBody.createdAt);
  t.ok(responseBody.updatedAt);
  t.end();
});

// Additional tests would go here for other endpoints
