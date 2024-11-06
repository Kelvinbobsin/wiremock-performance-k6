import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {

    test("Validando a consulta de todos os carros", () => {
        const url = 'http://localhost:8080/api/cars'; // URL da sul API simulada no Wiremock

        const response = http.get(url);
        
        check(response, {
            'status is 200': (r) => r.status === 200,
            'contains 5 cars': (r) => r.json().length === 5
        });

        // Aguardar 1 segundo entre as requisições
        sleep(1);
    });

}

// função auxiliar que simula o comportamento de 'it' do Cypress
function test(name, func) {
    console.log(`Running test: ${name}`);   
    func(); 
}