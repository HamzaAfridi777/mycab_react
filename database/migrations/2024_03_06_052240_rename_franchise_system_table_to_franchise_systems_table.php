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
        Schema::table('franchise_systems', function (Blueprint $table) {
            Schema::rename('franchise_system', 'franchise_systems');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('franchise_systems', function (Blueprint $table) {
            Schema::rename('franchise_systems', 'franchise_system');
        });
    }
};
