<?php


function is_prime($nb)
{
	$i = 2;
	while ($i != $nb)
	{
		if ($nb % $i == 0)
			return false;
		$i++;
	}
	return true;
}

function get_primes($nb)
{
	$i = 2;
	echo "$nb = ";
	while ($i != $nb)
	{
		if (is_prime($i) && $nb % $i == 0)
		{
			$nb = $nb / $i;
			echo "$i * ";
		}
		else
			$i++;
	}
	echo "$nb\n";
}

function prime_numbers($nb)
{
	if (is_prime($nb))
	{
		echo "$nb premier\n";
		return true;
	}
	else
	{
		get_primes($nb);
		return false;
	}
}


prime_numbers(97);
prime_numbers(100);
prime_numbers(4345);
prime_numbers(63456);

?>