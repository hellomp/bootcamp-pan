package Pratica1;

public class AvaliacaoAluno {
    public static void main(String[] args) {
        double nota1, nota2, nota3, nota4, frequencia, totalNotas;
        char statusAluno;
        boolean aprovado;
        String nomeAluno;

        nomeAluno = "Marcos Paulo";
        statusAluno = 'M';
        nota1 = 10;
        nota2 = 4;
        nota3 = 8;
        nota4 = 3;
        frequencia = 0.80;
        totalNotas = nota1 + nota2 + nota3 + nota4;
        aprovado = totalNotas >= 7 && frequencia >= 0.75;
        System.out.printf("Aluno %s obteve nota final %.2f e frequencia %.2f%% e o aluno está %c.\n" + "Aluno aprovado? %b", nomeAluno, totalNotas, frequencia * 100, statusAluno, aprovado);
    }
}
