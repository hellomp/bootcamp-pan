package Pacote01;

import java.util.Scanner;

public class Classe02 {
    public static void main(String[] args) {
        int valor1 = 0, valor2 = 75, valor3 = 0;
        Scanner input = new Scanner(System.in);
        System.out.println("Digite um número inteiro");
        valor1 = input.nextInt();
        valor2 += valor1;
        input.close();

        if(valor1 % 2 == 0)
            valor3 = valor1 * 5;
        else if(valor1 % 3 == 0)
            valor3 = valor2 * 9;
        else
            valor3 = valor2;
        System.out.printf("O valor 3 é %d.", valor3);
    }
}
