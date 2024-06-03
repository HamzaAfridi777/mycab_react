<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('assign_permission_to_franchise_system', function (Blueprint $table) {
            $table->integer('APTofranchiseSystem_id')->autoIncrement();
            $table->foreignId('franchise_permission_id')->constrained;
            $table->foreignId('franchiseSystem_id')->constrained;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assign_permission_to_franchise_system');
    }
};
