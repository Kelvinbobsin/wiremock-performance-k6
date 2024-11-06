import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {

    test("Deve retornar erro 500 ao envoar carro não permitido", () => {
        const url = 'http://localhost:8080/api/cars'; // URL da sul API simulada no Wiremock

        const payload = JSON.stringify({
            brand: 'Volkswagen',
            model: 'up tsi',
            year: 2020
        });

        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = http.post(url, payload, params);

        check(response, {
            'status is 500': (r) => r.status === 500,
            'error message is correct': (r) => r.json('message') === "Internal server error: model 'up tsi' is not allowed.",
        });
    });

     // Aguardar 1 segundo entre as requisições
     sleep(1);
}

// função auxiliar que simula o comportamento de 'it' do Cypress
function test(name, func) {
    console.log(`Running test: ${name}`);
    func();
}