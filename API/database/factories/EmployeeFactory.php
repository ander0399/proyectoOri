<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=>$this->faker->name,
            'codigo'=>$this->faker->codigo,
            'rol'=>$this->faker->rol,
            'programa'=>$this->faker->programa,
            'facultad'=>$this->faker->facultad,
            'departamento'=>$this->faker->departamento,
            'email'=>$this->faker->email,
            'phone'=>$this->faker->e164PhoneNumber,
            'departament_Id'=>$this->faker->numberBetween(1,6),


        ];
    }
}
