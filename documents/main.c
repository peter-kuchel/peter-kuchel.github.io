#include <stdio.h>
#include <stdlib.h>


int main(int argc, char* rgv[]){

    printf("Hi! I'm Peter Kuchel\n");
    int* i = NULL; 

    int x = i[1];

    printf("%d", x);
    // free(i);
    return 0;
}