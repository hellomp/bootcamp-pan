package Pacote01;

import java.util.Scanner;

public class Classe01 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        double n1 = 0, n2 = 0, n3 = 2, resultado;
        System.out.println("Digite o valor para n1");
        n1 = input.nextDouble();
        System.out.println("Digite o valor para n2");
        n2 = input.nextDouble();
        input.close();
        resultado = n1 * n2 / n3;
        System.out.printf("O valor total é %.2f.", resultado);
    }
}
