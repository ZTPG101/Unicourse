import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Repository } from 'typeorm';
import { Enrollment } from 'src/database/entities/enrollment.entity';
import { User } from 'src/database/entities/user.entity';
import { Course } from 'src/database/entities/course.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @Inject('ENROLLMENT_REPOSITORY')
    private EnrollmentRepo: Repository<Enrollment>,
    @Inject('USER_REPOSITORY')
    private UserRepo: Repository<User>,
    @Inject('COURSE_REPOSITORY')
    private CourseRepo: Repository<Course>,
  ) {}

  async create(
    createEnrollmentDto: CreateEnrollmentDto,
    userId: number,
  ): Promise<Enrollment | null> {
    const { courseId } = createEnrollmentDto;
    const user = await this.UserRepo.findOne({ where: { id: userId } });
    const course = await this.CourseRepo.findOne({ where: { id: courseId } });
    if (!user || !course) {
      throw new NotFoundException('User or Course not found');
    }
    const enrollment = this.EnrollmentRepo.create({ user, course });
    return this.EnrollmentRepo.save(enrollment);
  }

  async findById(id: number): Promise<Enrollment | null> {
    return this.EnrollmentRepo.findOne({
      where: { id },
    });
  }

  findAll(): Promise<Enrollment[]> {
    return this.EnrollmentRepo.find();
  }

  async update(
    id: number,
    updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<Enrollment | null> {
    const enrollment = await this.EnrollmentRepo.preload({
      id,
      ...updateEnrollmentDto,
    });
    if (!enrollment) return null;
    return this.EnrollmentRepo.save(enrollment);
  }

  async updateProgress(
    id: number,
    progress: number,
  ): Promise<Enrollment | null> {
    const enrollment = await this.EnrollmentRepo.findOne({ where: { id } });
    if (!enrollment) return null;
    enrollment.progress = progress;
    return this.EnrollmentRepo.save(enrollment);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.EnrollmentRepo.delete({ id });
    if (!result.affected) {
      throw new NotFoundException(`Enrollment with id ${id} not found`);
    }
    return { message: 'Enrollment deleted successfully.' };
  }
}
