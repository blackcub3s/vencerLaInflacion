# INTRODUCCIÓN

La inflación es una lacra producida por la impresión sin restricciones de moneda por parte de los bancos centrales (Reserva Federal en EEUU, Banco Central Europeo en Europa, Banco Central de la RepúblicaArgentina, en Argentina). Al aumentar la masa monetaria de forma artificiosa para subvencionar el déficit presupuestario de los estados, empresas o individuos, permitiendo que estos se endeuden excesivamente a futuro y que esa deuda se eternalice y nunca se pague, se genera algo inevitable: el incremento de la masa monetaria sin que ello conlleve un incremento parejo de los bienes producidos. Esto, al menos bajo mi leal saber y entender, genera la inflación.

Con este repositorio queremos generar una herramienta con la que poder explicar y calcular el interés compuesto de imposiciones a plazo, bonos del estado, u otros instrumentos bancarios y cómo calcular el efecto que la inflación tiene en nuestro captial y, por lo tanto, que tengamos herramientas para vencer la inflación sobre nuestros ahorros y así calcular cuántos años son necesarios para que dado un capital inicial $Q$ este no se pierda por efecto de la misma.

He visto conveniente dedicar un repositorio de github a ello porque con una inflación interanual de entorno el 6 por ciento (la que tenemos ahora a finales de 2023), de mantenerse por un período de 10 años implicaría inevitablemente que el capital que la gente tenga en líquidez va a reducirse a la mitad. Reitero: <strong>la población española va a perder la mitad de su dinero en 10 años</strong> (o lo que es lo mismo: si hoy 30 000 euros compran un coche, en 10 años se necesitarán 60 000 para comprar un producto con el mismo nivel de correspondencia en la gama del fabricante que hayamos escogido).

# FÓRMULAS DE CÁLCULO DEL INTERÉS COMPUESTO

Si hoy tenemos 10 000 euros y ponemos ese dinero en un instrumento de renta fija, variable, etc. de tal modo que nos genere un 3% TIN neto (es decir, después de haber ajustado el TIN bruto a TIN neto descontándole el IRPF correspondiente -que aquí no mostraremos-) tendremos que:

En un año tendremos $Q(1)$:

$$ Q(1) = 10000 \cdot 1.03 = 10300 $$

En dos años nuestro captial habrá ascendido a:

$$ Q(2) = (10000 \cdot 1.03)*1.03= 10609 $$

En tres:

$$ Q(3) = (10000 \cdot 1.03\cdot 1.03 )  \cdot 1.03 \approx 10927 $$

Y, por lo tanto, siguiendo el razonamiento inductivo es muy fácil ver que la fórmula general para calcular cuánto habrá crecido nuestro capital será simplemente una exponencial con exponente $n$ e interés, en tanto por uno, $i$ con capital inicial invertido $Q$:

$$ Q(n) = Q \cdot (1+i)^n $$

Si ahora lo que queremos determinar es <strong>solamente</strong> las ganancias netas a medida que van pasando los años podemos escribir la siguiente función $Q_{g}(n)$, que nos servirá para calcular el momento exacto en el que nuestras inversiones en renta fija podrán vencer la inflación (concretamente, es la función anterior a la que le restamos el capital inicial $Q$).

$$ Q_{g}(n) = Q \cdot (1+i)^n - Q$$

# FÓRMULAS DE CÁLCULO DE LA INFLACIÓN

El cálculo de la inflación es algo de lo que solamente se habla anualmente. Podemos calcularla en función del número de n años que pasan, mediante dos funciones distintas. Una función que multiplique por un "descuento" del dinero (como hace la aplicación bancaria de BBVA), o una función idéntica al interés compuesto pero que en lugar de multiplicar la cantidad incial $Q$ por el factor $(1 + i)^n$ lo divida (que es como algunas calculadoras online están implementadas, al menos a octubre de 2023, como por ejemplo esta página web de reino unido: ([wesleyan.co.uk](https://www.wesleyan.co.uk/savings-and-investments/inflation-calculator)). Ambas funciones no son iguales, y creo pueden ser funciones buenas para estimar la reducción teórica a la que se sotmete nuestro dinero con el paso del tiempo.

## FORMA 1 
Intuitivamente podemos entender el IPC de forma multiplicativa, como si el dinero, cada año que pasase, se fuese descontando a sí mismo con la función Q'(n).

POSAR CAS INDUCTIU

 Análogamente al caso anterior, cada año que pasa hay un descuento. En este caso, sin embargo, es un descuento que, cada año que pasa, en valor absoluto, se hace más pequeño (lo cual hace factible que podamos vencerlo con tipos de interés más bajos que la propia inflación):

$$ Q'(n) = Q \cdot (1-i)^n $$



# CONCLUSIONES

TO DO