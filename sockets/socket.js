const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Linkin Park'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Tapón'));
bands.addBand(new Band('LDA'));

console.log(bands);

// Sockets Messages
io.on('connection', client => {
    console.log('✅ Server Client connected...');

    client.on('mensaje', data => {
        console.log(data);
        io.emit('mensaje', { admin: 'Nuevo Mensaje...' })
    });

    client.on('disconnect', () => {
        console.log('❌ Server Client disconnected...');
    });

    client.on('emit-message', (payload) => {
        console.log(`New message emitted: ${payload}`);
        // io.emit('new-message', payload); // Emite a todos
        client.broadcast.emit('new-message', payload); // Emite a todos menos al emisor.
    });

    client.on('emitir-mensaje', (paylaod) => {
        console.log(`New message from Flutter app: ${paylaod}`);
        client.broadcast.emit('flutter_message', paylaod);
    });

    client.emit('active-bands', bands.getBands());

    client.on('vote_for_band', (payload) => {
        bands.voteBand(payload['id']);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add_new_band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete_band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
});